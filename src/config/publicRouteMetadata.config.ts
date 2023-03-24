import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY: string = 'isPublic';
const Public: any = () => SetMetadata(IS_PUBLIC_KEY, true);

export default Public