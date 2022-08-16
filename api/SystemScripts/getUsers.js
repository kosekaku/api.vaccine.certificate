import http from '../commons/utils/httpServices';
import { auth, DHIS2_API_BASE_URL } from '../commons/utils/authConfig';

const getUsers = async (req, res, next) => {
  try {
    // https://southsudanhis.org/api/users?fields=displayName,id,userCredentials[username,disabled,lastLogin,twoFA]&pageSize=50&page=1&order=firstName:asc,surname:asc&inactiveMonths=24
    const url =
      'https://southsudanhis.org/api/users?fields=displayName,id,userCredentials[username,disabled,lastLogin,twoFA]&paging=false&order=firstName:asc,surname:asc';
    const { data } = await http.get(url, {
      auth,
    });
    if (!data) throw Error('no user available');
    // counts
    let isDisabled = 0;
    let isNotDisabled = 0;
    data.users.map((user) => {
      user.userCredentials.disabled === true ? isDisabled++ : isNotDisabled++;
      // console.log(user.userCredentials.disabled == false);
    });
    res.json({
      'Total accounts disabled': isDisabled,
      'Total accounts not disabled': isNotDisabled,
      'Total accounts': data.users.length,
    });
  } catch (error) {
    console.log('error', error);
  }
};

export { getUsers };
