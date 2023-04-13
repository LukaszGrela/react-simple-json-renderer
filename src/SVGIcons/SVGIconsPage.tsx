import { Col, Row } from 'antd';
import React from 'react';
import { getEnumNames } from '../../utils/enums-get-names';
import Layout from '../Layout/Layout';
import SVGIcon, { IconTypesEnum } from './SVGIcons';

export interface IProps {
  className?: string;
}

const SVGIconsPage: React.FC<IProps> = ({ className }: IProps): JSX.Element => {
  const list = Array.from(getEnumNames(IconTypesEnum)).map((icon) => (
    <Col
      key={icon}
      style={{
        fontSize: '2rem',
      }}
    >
      <SVGIcon emBased icon={icon} title={icon} />
    </Col>
  ));

  return (
    <Layout title={'Show me icons'} className={className}>
      <Row gutter={[8, 8]}>{list}</Row>
    </Layout>
  );
};

export default SVGIconsPage;
