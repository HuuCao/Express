const { logisticDB, Sequelize } = require("../models");
const user = logisticDB.user;
const role_permissions = logisticDB.role_permissions;
const Op = Sequelize.Op;
const utils = require("../common/utils");
const bcrypt = require("../libs/bcrypt");


module.exports.addPermission = async (req, res, next) => {
    if(req.body.id_permission == undefined ||
        req.body.id_role == undefined)
            return res.status(400).json({success:false,mess:"Missing parram !"});

    var role_permissionsAlready = await role_permissions.findOne({
        where:{
            permissionId:req.body.id_permission,
            roleId:req.body.id_role
        }
    });

    if(!role_permissionsAlready)
    {
        role_permissions.create({
            permissionId:req.body.id_permission,
            roleId:req.body.id_role
        }).then(result =>{  
            return res.status(200).json({success:true});
        }).catch(err=>{
            return res.status(400).json({success:false,mess:"Error :"+err});

        })
    }else
    {
        return res.status(400).json({success:false,mess:"Existed role_permissions !"});

    }


};

module.exports.removePermisson = async (req, res, next) => {
    if(req.body.id_permission == undefined ||
        req.body.id_role == undefined)
            return res.status(400).json({success:false,mess:"Missing parram !"});

    var role_permissionsAlready = await role_permissions.findOne({
        where:{
            permissionId:req.body.id_permission,
            roleId:req.body.id_role
        }
    });

    if(role_permissionsAlready)
    {
        role_permissions.destroy({
           where:{
            permissionId:req.body.id_permission,
            roleId:req.body.id_role
           }
        }).then(result =>{  
            return res.status(200).json({success:true});
        }).catch(err=>{
            return res.status(400).json({success:false,mess:"Error :"+err});

        })
    }else
    {
        return res.status(400).json({success:false,mess:"Not Found role_permissions !"});

    }


};
