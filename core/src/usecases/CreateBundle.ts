import { reduce, some } from "lodash";
import md5 from "md5";
import { isMatch } from "micromatch";
import { getType } from "mime";

import { BundleFallbackAssetNotFoundError } from "../common/errors";
import generateId from "../common/generateId";
import Usecase from "../common/Usecase";
import { IBundle, validateBundleNameOrTag } from "../entities/Bundle";
import { Operation } from "../entities/OperationLog";

export default class CreateBundle extends Usecase {
    async exec(partial: {
        name: string;
        tag: string;
        description: string;
        // tar archive of the bunlde
        content: Buffer;
        fallbackAssetPath: string;
        fallbackStatusCode: number;
        headers: {
            [assetMatcher: string]: {
                [headerName: string]: string;
            };
        };
    }): Promise<IBundle> {
        // Auth check
        await this.authorizer.ensureCanCreateBundle(partial.name);

        // Validate name and tag
        validateBundleNameOrTag(partial.name, "name");
        validateBundleNameOrTag(partial.tag, "tag");

        // Generate an id for the bundle
        const id = generateId();

        // Build the assets list
        const files = await this.archiver.extractFiles(partial.content);
        const assets = files.map((file) => {
            return {
                path: file.path,
                mimeType: getType(file.path) || "application/octet-stream",
                content: file.content,
                // partial.headers is a ( assetMatcher, headers ) map. Build the
                // asset's headers object by merging all headers objects in the
                // map whose asset matcher matches the asset path
                headers: reduce(
                    partial.headers,
                    (finalHeaders, headers, assetMatcher) => ({
                        ...finalHeaders,
                        ...(isMatch(file.path, assetMatcher) ? headers : null),
                    }),
                    {}
                ),
            };
        });

        // Ensure the fallbackAssetPath corresponds to an asset in the bundle
        if (!some(assets, { path: partial.fallbackAssetPath })) {
            throw new BundleFallbackAssetNotFoundError(
                partial.fallbackAssetPath
            );
        }

        // todo: 检查hash

        // Create the bundle database object
        const createdBundle = await this.storages.bundles.createOne({
            id: id,
            name: partial.name,
            tag: partial.tag,
            description: partial.description,
            hash: md5(partial.content),
            assets: assets,
            fallbackAssetPath: partial.fallbackAssetPath,
            fallbackStatusCode: partial.fallbackStatusCode,
            createdAt: new Date(),
        });

        // Log the operation
        await this.operationLogger.logOperation(Operation.CreateBundle, {
            createdBundle,
        });

        return createdBundle;
    }
}
