export type BHARun2_0_0 = {
  id: string;
  kind: string;
  version: number;
  acl: {
    owners: string[];
    viewers: string[];
  };
  legal: {
    legaltags: string[];
    otherRelevantDataCountries: string[];
    status: string;
  };
  tags: Record<string, string>;
  createTime: string;
  createUser: string;
  modifyTime: string;
  modifyUser: string;
  ancestry: {
    parents: string[];
  };
  meta: MetaUnit[];
  data: BHARunData;
};

export type MetaUnit = {
  kind: string;
  name: string;
  persistableReference: string;
  unitOfMeasureID: string;
  propertyNames: string[];
};

/* ---- Data Section ---- */

export type BHARunData = {
  ResourceHomeRegionID: string;
  ResourceHostRegionIDs: string[];
  ResourceCurationStatus: string;
  ResourceLifecycleStatus: string;
  Source: string;
  ExistenceKind: string;
  NameAliases: NameAlias[];
  GeoContexts: GeoContext[];
  SpatialLocation: SpatialLocation;
  VersionCreationReason: string;
  TechnicalAssuranceTypeID: string;
  TechnicalAssurances: TechnicalAssurance[];
  ProjectID: string;
  ProjectName: string;
  Purpose: string;
  ProjectBeginDate: string;
  ProjectEndDate: string;
  FundsAuthorizations: FundsAuthorization[];
  ContractIDs: string[];
  Operator: string;
  Contractors: Contractor[];
  Personnel: Personnel[];
  ProjectSpecifications: ProjectSpecification[];
  ProjectStates: ProjectState[];
  WellboreID: string;
  Name: string;
  TubularID: string;
  HoleSectionID: string;
  VerticalMeasurement: {
    VerticalReferenceEntityID: string;
    VerticalReferenceID: string;
  };
  ActivityStartDateTime: string;
  ActivityStopDateTime: string;
  DrillingStartDateTime: string;
  DrillingStopDateTime: string;
  Dogleg: number;
  MaximumDogleg: number;
  PlannedDogleg: number;
  StatusBhaID: string;
  BitRunNumber: string;
  StringRunNumber: number;
  TripReasonID: string;
  ObjectiveBha: string;
  RunParameterPlans: RunParameterPlan[];
  MeasuredDepthRunStart: number;
  MeasuredDepthRunStop: number;
  HoleDiameter: number;
  WtAboveJar: number;
  WtBelowJar: number;
  DrillingParams: DrillingParam[];
  IsLeftInHole: boolean;
  IsNuclearSource: boolean;
  TripTimeIn: number;
  TripTimeOut: number;
  PredictedPerformanceDescription: string;
  ActualPerformanceDescription: string;
  RunComment: string;
  ExtensionProperties: Record<string, unknown>;
};

/* ---- Ancillary Types ---- */

export type NameAlias = {
  AliasName: string;
  AliasNameTypeID: string;
  DefinitionOrganisationID: string;
  EffectiveDateTime: string;
  TerminationDateTime: string;
};

export type GeoContext = {
  GeoPoliticalEntityID?: string;
  BasinID?: string;
  FieldID?: string;
  PlayID?: string;
  ProspectID?: string;
  GeoTypeID: string;
};

export type SpatialLocation = {
  SpatialLocationCoordinatesDate: string;
  QuantitativeAccuracyBandID: string;
  QualitativeSpatialAccuracyTypeID: string;
  CoordinateQualityCheckPerformedBy: string;
  CoordinateQualityCheckDateTime: string;
  CoordinateQualityCheckRemarks: string[];
  AsIngestedCoordinates: AnyCrsFeatureCollection;
  Wgs84Coordinates: FeatureCollection;
  AppliedOperations: string[];
  SpatialParameterTypeID: string;
  SpatialGeometryTypeID: string;
};

export type AnyCrsFeatureCollection = {
  type: string;
  CoordinateReferenceSystemID: string;
  VerticalCoordinateReferenceSystemID: string;
  VerticalUnitID: string;
  persistableReferenceCrs: string;
  persistableReferenceVerticalCrs: string;
  persistableReferenceUnitZ: string;
  features: AnyCrsFeature[];
  bbox: number[];
};

export type AnyCrsFeature = {
  type: string;
  properties: Record<string, unknown>;
  geometry: {
    type: string;
    coordinates: number[];
    bbox: number[];
  };
  bbox: number[];
};

export type FeatureCollection = {
  type: string;
  features: Feature[];
  bbox: number[];
};

export type Feature = {
  type: string;
  properties: Record<string, unknown>;
  geometry: {
    type: string;
    coordinates: number[];
    bbox: number[];
  };
  bbox: number[];
};

export type TechnicalAssurance = {
  TechnicalAssuranceTypeID: string;
  Reviewers: Reviewer[];
  AcceptableUsage: Usage[];
  UnacceptableUsage: Usage[];
  EffectiveDate: string;
  Comment: string;
};

export type Reviewer = {
  RoleTypeID: string;
  DataGovernanceRoleTypeID: string;
  WorkflowPersonaTypeID: string;
  OrganisationID: string;
  Name: string;
};

export type Usage = {
  WorkflowUsageTypeID: string;
  WorkflowPersonaTypeID: string;
  DataQualityRuleSetID: string;
  DataQualityID: string;
  ValueChainStatusTypeID: string;
};

export type FundsAuthorization = {
  AuthorizationID: string;
  EffectiveDateTime: string;
  FundsAmount: number;
  CurrencyID: string;
};

export type Contractor = {
  ContractorOrganisationID: string;
  ContractorCrew: string;
  ContractorTypeID: string;
};

export type Personnel = {
  PersonName: string;
  CompanyOrganisationID: string;
  ProjectRoleID: string;
};

export type ProjectSpecification = {
  EffectiveDateTime: string;
  TerminationDateTime: string;
  ProjectSpecificationQuantity: number;
  ProjectSpecificationDateTime: string;
  ProjectSpecificationIndicator: boolean;
  ProjectSpecificationText: string;
  UnitOfMeasureID: string;
  ParameterTypeID: string;
};

export type ProjectState = {
  EffectiveDateTime: string;
  TerminationDateTime: string;
  ProjectStateTypeID: string;
};

/* ---- Parameter Plan Structures ---- */

export type RunParameterPlan = {
  RunStartHoleMeasuredDepth: number;
  RunEndHoleMeasuredDepth: number;
  OperationParameterPlan: OperationParameterPlan;
};

export type OperationParameterPlan = {
  RealizationStrategy: string;
  TorqueOnBottomGroup?: ParameterGroup;
  RPMGroup?: {
    SurfaceRPMGroup?: ParameterGroup;
    DownHoleRPMGroup?: ParameterGroup;
  };
  ROPGroup?: ParameterGroup;
  WOBGroup?: ParameterGroup;
  FlowratePumpGroup?: ParameterGroup;
  TorqueAtSurfaceGroup?: ParameterGroup;
};

export type ParameterGroup = {
  MaximumParameter?: ParameterPoint[];
  MinimumParameter?: ParameterPoint[];
  RecommendedParameter?: ParameterPoint[];
};

export type ParameterPoint = {
  ObservationMeasuredDepth: number;
  Value: number;
  ValueUnitID: string;
  PointsSources: PointSource[];
};

export type PointSource = {
  Name: string;
  Value: number;
  ValueUnitID: string;
  Description: string;
};

/* ---- Drilling Params ---- */

export type DrillingParam = {
  BitRunTIme: string;
  RunStartHoleMeasuredDepth: number;
  RunEndHoleMeasuredDepth: number;
  RotatingHookload: number;
  OverPull: number;
  SlackOff: number;
  HookloadUp: number;
  HookloadDown: number;
  AverageTorqueOnBottom: number;
  MaximumTorqueOnBottom: number;
  MinimumTorqueOnBottom: number;
  AverageTorqueOffBottom: number;
  AverageTorqueDownhole: number;
  WeightAboveJar: number;
  WeightBelowJar: number;
  WeightMud: number;
  AverageFlowratePump: number;
  MaximumFlowratePump: number;
  MinimumFlowratePump: number;
  AverageVelocityBitNozzle: number;
  PowerBit: number;
  PressureDropBit: number;
  TimeHolding: number;
  TimeSteering: number;
  TimeDrillingRotating: number;
  TimeDrillingSliding: number;
  TimeCirculating: number;
  TimeReaming: number;
  DistanceDrilledRotating: number;
  DistanceDrilledSliding: number;
  DistanceReamed: number;
  DistanceHolding: number;
  DistanceSteering: number;
  AverageRpm: number;
  MaximumRpm: number;
  MinimumRpm: number;
  AverageRpmDownhole: number;
  AverageROP: number;
  MaximumROP: number;
  MinimumROP: number;
  AverageWOB: number;
  MaximumWOB: number;
  MinimumWOB: number;
  AverageWOBDownhole: number;
  AzimuthTop: number;
  AzimuthBottom: number;
  InclinationStart: number;
  MaximumInclination: number;
  MinimumInclination: number;
  InclinationStop: number;
  MaximumMudTemperatureDownhole: number;
  MinimumPumpPressure: number;
  MaximumPumpPressure: number;
  AveragePumpPressure: number;
  MinimumBitFlowrate: number;
  MaximumBitFlowrate: number;
  AverageBitFlowrate: number;
  MudClass: string;
  Comments: string;
};
