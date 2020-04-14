export default function(acl) {
  if (!acl.rights)
    console.log('error acl bad format')

  let rules = ['r', 'w', 'a'];
  let rawRights = acl.rights.toLowerCase().split('');
  let rights = [];

  for (let i = 0; i < rules.length; i++) {
    if (rawRights.indexOf(rules[i]) !== -1) {
      rights.push({ name: rules[i], enabled: true });
    } else {
      rights.push({ name: rules[i], enabled: false });
    }
  }

  return { ...acl, rights };
}
