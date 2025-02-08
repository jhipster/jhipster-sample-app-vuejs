export default class LoginService {
  private readonly emit: (event: string, ...args: any[]) => void;

  constructor({ emit }: { emit: (event: string, ...args: any[]) => void }) {
    this.emit = emit;
  }

  public openLogin(): void {
    this.emit('bv::show::modal', 'login-page');
  }

  public hideLogin(): void {
    this.emit('bv::hide::modal', 'login-page');
  }
}
