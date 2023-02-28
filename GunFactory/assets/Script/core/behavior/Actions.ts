
export const Actions: { [key: string]: { new(): b3.BaseNode } } = Object.create(null);
export function register(classObj: { new(): b3.BaseNode }, name: string) {
    Actions[name.replace("Action", "")] = classObj;
}

