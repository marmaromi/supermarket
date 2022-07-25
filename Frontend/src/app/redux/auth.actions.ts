import { createAction, props } from '@ngrx/store';

export const login = createAction(
    '[Login] Login',
    props<{ token: string;}>()
);

export const logout = createAction(
    '[Logout] Logout',
);