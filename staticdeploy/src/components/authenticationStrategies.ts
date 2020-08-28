import { IAuthenticationStrategy } from "@staticdeploy/core";
import JwtAuthenticationStrategy from "@staticdeploy/jwt-authentication-strategy";
import Logger from "bunyan";

import IConfig from "../common/IConfig";

export default (config: IConfig, logger: Logger): IAuthenticationStrategy[] => {
    const authenticationStrategies: IAuthenticationStrategy[] = [];

    if (config.jwtSecretOrPublicKey) {
        logger.info("Using JwtAuthenticationStrategy authentication strategy");
        authenticationStrategies.push(
            new JwtAuthenticationStrategy(config.jwtSecretOrPublicKey)
        );
    }

    return authenticationStrategies;
};
