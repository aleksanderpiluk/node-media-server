export interface UseCase<T, S> {
    execute(dto: T): Promise<S> | S;
}
