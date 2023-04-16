import { FC } from 'react';

type UserAvatarProps = {
  email: string;
};

const UserAvatar: FC<UserAvatarProps> = ({ email }) => {
  const displayName = email.split('@')[0];
  return (
    <div className="flex">
      <span>привіт, {displayName}</span>
    </div>
  );
};

export default UserAvatar;
