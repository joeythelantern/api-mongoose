export function Controller(baseRoute: string = '') {
    return (target: any) => {
        Reflect.defineMetadata('baseRoute', baseRoute, target);
    };
}
