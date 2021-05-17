const userId = 'moyoyomiyazawa';


const buttonClickHandler = async () => {
  try {
    const userId = getUserId();
    const userInfo = await fetchUserInfo(userId);
    const userInfoElement = createUserInfoElement(userInfo);
    const result = document.getElementById('result');
    result.innerHTML = userInfoElement;
  } catch (error) {
    console.error(error);
  }
};

const getUserId = () => {
  return document.getElementById('userId').value;
}

const fetchUserInfo = async (userId) => {
  const response = await fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}


const createUserInfoElement = (userInfo) => {
  return escapeHTML`
  <h4>${userInfo.name} (@${userInfo.login})</h4>
  <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100" />
  <dl>
    <dt>Location</dt>
    <dd>${userInfo.location}</dd>
    <dt>Repositories</dt>
    <dd>${userInfo.public_repos}</dd>
  </dl>
  `;
};


function escapeSpecialChars(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}


function escapeHTML(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i - 1];
    if (typeof value === 'string') {
      return result + escapeSpecialChars(value) + str;
    } else {
      return result + String(value) + str;
    }
  });
}
