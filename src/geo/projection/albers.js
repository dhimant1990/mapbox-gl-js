// @flow
import LngLat from '../lng_lat.js';

export const albers = {
    name: 'albers',
    range: [3.5, 7],

    center: [-96, 37.5],
    parallels: [29.5, 45.5],

    project(lng: number, lat: number) {
        const p1 = this.parallels[0] / 180 * Math.PI;
        const p2 = this.parallels[1] / 180 * Math.PI;
        const n = 0.5 * (Math.sin(p1) + Math.sin(p2));
        const theta = n * ((lng - this.center[0]) / 180 * Math.PI);
        const c = Math.pow(Math.cos(p1), 2) + 2 * n * Math.sin(p1);
        const r = 0.5;
        const a = r / n * Math.sqrt(c - 2 * n * Math.sin(lat / 180 * Math.PI));
        const b = r / n * Math.sqrt(c - 2 * n * Math.sin(0 / 180 * Math.PI));
        const x = a * Math.sin(theta);
        const y = b - a * Math.cos(theta);
        return {x: 1 + 0.5 * x, y: 1 - 0.5 * y};
    },
    unproject(x: number, y: number) {
        const p1 = this.parallels[0] / 180 * Math.PI;
        const p2 = this.parallels[1] / 180 * Math.PI;
        const n = 0.5 * (Math.sin(p1) + Math.sin(p2));
        const c = Math.pow(Math.cos(p1), 2) + 2 * n * Math.sin(p1);
        const r = 0.5;
        const b = r / n * Math.sqrt(c - 2 * n * Math.sin(0 / 180 * Math.PI));
        const x_ = (x - 1) * 2;
        const y_ = (y - 1) * -2;
        const y2 = -(y_ - b);
        const theta = Math.atan2(x_, y2);
        const lng = (theta / n * 180 / Math.PI) + this.center[0];
        const a = x_ / Math.sin(theta);
        const lat = Math.asin((Math.pow(a / r * n, 2) - c) / (-2 * n)) * 180 / Math.PI;
        return new LngLat(lng, lat);
    }
};

export const alaska = {
    ...albers,
    name: 'alaska',
    range: [4, 7],
    center: [-154, 50],
    parallels: [55, 65]
};