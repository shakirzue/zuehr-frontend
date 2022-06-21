const PermissionProvider = ({ permissionDetails, moduleName, permissionLevel }) => {

    let list = permissionDetails.filter(row => row.ModuleDiscription === moduleName && (row.PermissionDescription === permissionLevel || row.PermissionDescription === "All"))
    if (list.length > 0) {
        return true;
    }
    else {
        return false;
    }
}

export default PermissionProvider;