export class InboxStatus {
  constructor(public readonly value: 'pending' | 'processed') {}

  isEqual(status: InboxStatus): boolean {
    return this.value === status.value;
  }
}
