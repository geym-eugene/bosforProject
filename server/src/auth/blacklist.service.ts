import { Injectable } from '@nestjs/common';

@Injectable()
export class BlacklistService {
  private blacklistedTokens = new Set<string>();

  addToBlacklist(token: string): void {
    this.blacklistedTokens.add(token);
  }

  isBlacklisted(token: string): boolean {
    return this.blacklistedTokens.has(token);
  }
}
