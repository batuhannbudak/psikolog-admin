import React from 'react';
import cx from 'classnames';
import {
  bool, string, func, object
} from 'prop-types';

import Badge from '../Badge';
import Text from '../Text';
import FeaturedIcon from '../FeaturedIcon';
import DetailWrapper from '../DetailWrapper';
import {
  MAP_THEME, SEPERATORS
} from './constants';
import LoadingDots from '../LoadingDots';

const MetricItem = ({
  Icon,
  BadgeContent,
  isLoading,
  theme,
  subtitle,
  title,
  className,
  metrics,
  isMetricsLoading,
  needsPadding,
  ...props
}) => {
  const metricValues = Object.values(metrics);
  const isDetailsVisible = metricValues?.length > 0 && !isMetricsLoading;

  const Seperator = SEPERATORS[theme];

  return (
    <div
      className={cx(
        'flex items-center overflow-hidden p-6 bg-white radius-xl min-h-44 max-h-44',
        MAP_THEME[theme],
        className
      )}
      {...props}
    >
      {isLoading ? (
        <div className='w-full h-full flex items-center justify-center'>
          <LoadingDots />
        </div>
      ) : (
        <>
          <div className='flex flex-col gap-6 justify-center h-full mr-4'>
            <FeaturedIcon
              type="span"
              size="xl"
              theme={theme}
              Icon={Icon}
            />
            <div className="flex flex-col">
              <Text type="h3" size="sm" color="pale">{subtitle}</Text>
              <div className="w-full flex justify-between items-center">
                {isLoading
                  ? <div className="mt-3 h-7"><LoadingDots /></div>
                  : <Text size="xl4" className="font-medium">{title}</Text>}
                {BadgeContent && (
                  <Badge size="sm" type="inverse" theme={theme}>
                    <BadgeContent />
                  </Badge>
                )}
              </div>
            </div>
          </div>
          {isDetailsVisible && !isMetricsLoading && (
            <>
              <Seperator />
              <DetailWrapper metrics={metrics} needsPadding={needsPadding} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MetricItem;

MetricItem.propTypes = {
  Icon: func,
  BadgeContent: func,
  isLoading: bool,
  theme: string,
  subtitle: string,
  title: string,
  className: string,
  metrics: object,
  isMetricsLoading: bool,
  needsPadding: bool
};

MetricItem.defaultProps = {
  Icon: f => f,
  BadgeContent: null,
  isLoading: false,
  theme: 'navy',
  subtitle: '',
  title: '',
  className: '',
  metrics: {},
  isMetricsLoading: false,
  needsPadding: false
};
