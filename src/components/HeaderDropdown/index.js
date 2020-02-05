import { Dropdown } from 'antd';
import React from 'react';
// import classNames from 'classnames';

declare type OverlayFunc = () => React.ReactNode;

// export interface HeaderDropdownProps extends DropDownProps {
//   overlayClassName?: string;
//   overlay: React.ReactNode | OverlayFunc;
//   placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomCenter';
// }

const HeaderDropdown = ({ cls, ...restProps }) => (
    // <Dropdown overlayClassName={classNames(styles.container, cls)} {...restProps} />
    <Dropdown {...restProps} />
);

export default HeaderDropdown;
