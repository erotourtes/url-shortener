const types = {
  ".": (_) => "file",
  "files": (_) => "file",
  ":": (_) => "variable",
  "=": (_) => "variable",
  default: (path) => path,
};

const parseURL = (path) => {
  const pathParts = path.split("/").filter((part) => part);
  let unifiedPath = "";
  const variables = [];

  for (let i = 0; i < pathParts.length; i++) {
    const keys = Object.keys(types);
    const key = keys.find((key) => pathParts[i].includes(key)) || "default";
    const parser = types[key];

    unifiedPath += "/" + parser(pathParts[i]);

    if (key === ":" || key === "=")
      variables.push(pathParts[i].substring(1));
  }

  return { unifiedPath, variables } ;
};

export default parseURL;

