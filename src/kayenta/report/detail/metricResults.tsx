import * as React from 'react';
import { connect } from 'react-redux';

import ListDetail from '../../layout/listDetail';
import { ICanaryState } from 'kayenta/reducers';
import { ICanaryAnalysisResult } from 'kayenta/domain/ICanaryJudgeResult';
import MetricResultsList from './metricResultsList';
import MetricResultDetail from './metricResultDetail';
import { judgeResultSelector } from 'kayenta/selectors';

import './metricResults.less';

interface IMetricResultsStateProps {
  metricResults: ICanaryAnalysisResult[];
  selectedMetricResult: ICanaryAnalysisResult;
}

const MetricResults = ({ metricResults, selectedMetricResult }: IMetricResultsStateProps) => {
  const list = <MetricResultsList results={metricResults} />;
  const detail = <MetricResultDetail result={selectedMetricResult} />;

  return (
    <ListDetail
      list={list}
      listClass="vertical"
      listWidth={5}
      detail={detail}
      detailClass="vertical"
      detailWidth={9}
      className="metric-results flex-1"
    />
  );
};

const mapStateToProps = (state: ICanaryState): IMetricResultsStateProps => {
  const {
    selectedRun: { selectedGroup, selectedMetric },
  } = state;
  const result = judgeResultSelector(state);

  // Build list of metric results to render.
  const filter: (r: ICanaryAnalysisResult) => boolean = selectedGroup
    ? (r) => r.groups.includes(selectedGroup)
    : () => true;

  return {
    metricResults: Object.values(result.results).filter(filter),
    selectedMetricResult: Object.values(result.results).find((r) => r.id === selectedMetric),
  };
};

export default connect(mapStateToProps)(MetricResults);
