import { Express, RequestHandler } from 'express';

export interface IRouteProps {
    route: string;
    middleware: any[];
}

export type TRoute = { [key: string]: IRouteProps[] };

export type RouteHandler = Map<keyof Express, Map<string, RequestHandler[]>>;
