export interface ApiOptionsBase<Action extends string = string, Payload = any> {
    action: Action;
    payload: Payload;
}
