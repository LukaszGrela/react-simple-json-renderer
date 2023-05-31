import React from 'react';
import { IProps, TIconType } from './types';
import { classnames } from '../../utils/classnames';
import './styles/index.scss';

const selectIcon = (icon: TIconType): JSX.Element => {
  switch (icon) {
    case 'add':
      /* https://fonts.google.com/icons */
      return <path d='M450-200v-250H200v-60h250v-250h60v250h250v60H510v250h-60Z' />;
    case 'close':
      /* https://fonts.google.com/icons */
      return (
        <path d='m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z' />
      );
    case 'collapse':
      /* https://fonts.google.com/icons */
      return (
        <path d='m480-351 173-173-43-42-130 130-130-130-43 42 173 173Zm0 271q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z' />
      );
    case 'confirm':
      /* https://fonts.google.com/icons */
      return <path d='M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z' />;
    case 'edit':
      /* https://fonts.google.com/icons */
      return (
        <path d='M180-180h44l443-443-44-44-443 443v44Zm614-486L666-794l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248-120H120v-128l504-504 128 128Zm-107-21-22-22 44 44-22-22Z' />
      );
    case 'expand':
      /* https://fonts.google.com/icons */
      return (
        <path d='m350-394 130-130 130 130 43-42-173-173-173 173 43 42ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-155.5t85.5-127q54-54.5 127-86T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 83-31.5 156t-86 127q-54.5 54-127 85.5T480-80Zm0-60q141 0 240.5-99T820-480q0-141-99.5-240.5T480-820q-142 0-241 99.5T140-480q0 142 99 241t241 99Zm0-340Z' />
      );
    case 'remove':
      /* https://fonts.google.com/icons */
      return (
        <path d='m361-299 119-121 120 121 47-48-119-121 119-121-47-48-120 121-119-121-48 48 120 121-120 121 48 48ZM261-120q-24 0-42-18t-18-42v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570Zm-438 0v570-570Z' />
      );
    case 'ban':
    default: {
      if (icon !== 'ban') {
        console.warn(`SVGIcon: There is no '${icon}' icon available.`);
      }
      /* https://fonts.google.com/icons */
      return (
        <path d='M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-60q142.375 0 241.188-98.812Q820-337.625 820-480q0-60.662-21-116.831Q778-653 740-699L261-220q45 39 101.493 59.5Q418.987-140 480-140ZM221-261l478-478q-46-39-102.169-60T480-820q-142.375 0-241.188 98.812Q140-622.375 140-480q0 61.013 22 117.507Q184-306 221-261Z' />
      );
    }
  }
};

const SVGIcon: React.FC<IProps> = ({
  icon,
  title,
  className,
  id,
  emBased = false,
  viewBox = '0 -960 960 960',
}: IProps): JSX.Element => (
  <svg
    id={id}
    role={title ? 'img' : undefined}
    aria-hidden={title ? undefined : true}
    className={classnames('SVGIcon', className, emBased && 'SVGIcon-em-based')}
    xmlns='http://www.w3.org/2000/svg'
    viewBox={viewBox}
  >
    {process.env.NODE_ENV === 'development' && `<!-- ${icon} -->`}
    {selectIcon(icon)}
    {title && <title>{title}</title>}
  </svg>
);

export default SVGIcon;
