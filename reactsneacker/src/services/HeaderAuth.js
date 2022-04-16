
export default function HeaderAuth(token) {
    if (token) {
      return { Authorization: 'Token ' + token };
    } else {
      return {};
    }
  }