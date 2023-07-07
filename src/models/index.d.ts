import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerRobot = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Robot, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly width: string;
  readonly length: string;
  readonly height: string;
  readonly sensorType: string;
  readonly imageUrl: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRobot = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Robot, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly width: string;
  readonly length: string;
  readonly height: string;
  readonly sensorType: string;
  readonly imageUrl: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Robot = LazyLoading extends LazyLoadingDisabled ? EagerRobot : LazyRobot

export declare const Robot: (new (init: ModelInit<Robot>) => Robot) & {
  copyOf(source: Robot, mutator: (draft: MutableModel<Robot>) => MutableModel<Robot> | void): Robot;
}