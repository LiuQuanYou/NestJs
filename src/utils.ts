import * as crypto from 'crypto';
import { ParseIntPipe, HttpException } from '@nestjs/common';

/**
 *
 * @param str 要加密解密的字符
 * @returns
 */
export function md5(str: string): string {
  if (!str) return '';
  const hash = crypto.createHash('md5');
  return hash.update(str).digest('hex');
}

export function generateParseIntPipe(name) {
  return new ParseIntPipe({
    exceptionFactory() {
      throw new HttpException(name + ' 应该传数字', 500);
    },
  });
}
