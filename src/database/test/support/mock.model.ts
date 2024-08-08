export abstract class MockModel<T> {
    protected abstract entitySub: T;

    constructor(createEntityData: T) {
        this.constructorSpy(createEntityData)
    }

    constructorSpy(_createEntity: T): void { }

    findOne(): { exec: () => T } {
        return {
            exec: (): T => this.entitySub
        }
    }

    async find(): Promise<T[]> {
        return [this.entitySub]
    }

    async save(): Promise<T> {
        return this.entitySub;
    }

    async findOneAndUpdate(): Promise<T> {
        return this.entitySub
    }
}