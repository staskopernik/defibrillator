import { 
  CREATE_DEF_POINT,
  EDIT_DEF_POINT,
  DELETE_DEF_POINT
} from '../Sidebar/components/ItemList/consts';

import {
  SIGNUP,
  ADMIN,
  USER
} from './const';

const checkUserIsAuth = user => user !== null;
const checkPermissionIsAdmin = user => checkUserIsAuth(user) && (user.role === ADMIN);
const checkPermissionIsUser = user => checkUserIsAuth(user) && (user.role === USER);
const checkUserIsOwner = (user, defibrillator) => user._id === defibrillator.owner;

const permissionService = (action, user, defibrillator) => {
  switch (action) {
    case CREATE_DEF_POINT:
      return checkUserIsAuth(user);

    case EDIT_DEF_POINT:
    case DELETE_DEF_POINT:
      return checkPermissionIsAdmin(user) ||
             (checkPermissionIsUser(user) && checkUserIsOwner(user, defibrillator));

    case SIGNUP:
      return checkPermissionIsAdmin(user);

    default:
      return false;
  };
};

export default permissionService;
