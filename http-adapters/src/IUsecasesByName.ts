import * as sd from "@staticdeploy/core";

export default interface IUsecasesByName {
    checkHealth: typeof sd.CheckHealth;
    createApp: typeof sd.CreateApp;
    createBundle: typeof sd.CreateBundle;
    createEntrypoint: typeof sd.CreateEntrypoint;
    createGroup: typeof sd.CreateGroup;
    createUser: typeof sd.CreateUser;
    deleteApp: typeof sd.DeleteApp;
    deleteBundlesByNameAndTag: typeof sd.DeleteBundlesByNameAndTag;
    deleteEntrypoint: typeof sd.DeleteEntrypoint;
    deleteGroup: typeof sd.DeleteGroup;
    deleteUser: typeof sd.DeleteUser;
    deployBundle: typeof sd.DeployBundle;
    getApp: typeof sd.GetApp;
    getApps: typeof sd.GetApps;
    getBundle: typeof sd.GetBundle;
    getBundleNames: typeof sd.GetBundleNames;
    getBundles: typeof sd.GetBundles;
    getBundlesByNameAndTag: typeof sd.GetBundlesByNameAndTag;
    getBundleTagsByBundleName: typeof sd.GetBundleTagsByBundleName;
    getCurrentUser: typeof sd.GetCurrentUser;
    getEntrypoint: typeof sd.GetEntrypoint;
    getEntrypointsByAppId: typeof sd.GetEntrypointsByAppId;
    getGroup: typeof sd.GetGroup;
    getGroups: typeof sd.GetGroups;
    getOperationLogs: typeof sd.GetOperationLogs;
    getUser: typeof sd.GetUser;
    getUsers: typeof sd.GetUsers;
    respondToEndpointRequest: typeof sd.RespondToEndpointRequest;
    updateApp: typeof sd.UpdateApp;
    updateEntrypoint: typeof sd.UpdateEntrypoint;
    updateGroup: typeof sd.UpdateGroup;
    updateUser: typeof sd.UpdateUser;
}
