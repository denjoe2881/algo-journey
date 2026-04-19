import { defineTests } from '../../_test-utils';

export default defineTests('vehicle-factory', (t) => {
  t.visible('basic-factory', {
    operations: [
      ['VehicleFactory'],
      ['orderVehicle', 'Car'],
      ['orderVehicle', 'Bike'],
      ['orderVehicle', 'Plane'],
    ],
    expected: [
      null,
      'This is a Car | Starting engine of car | Stopping car',
      'This is a Bike | Pedaling bike | Using bike brakes',
      'Unknown type',
    ],
  });

  t.visible('motorbike', {
    operations: [
      ['VehicleFactory'],
      ['orderVehicle', 'Motorbike'],
    ],
    expected: [null, 'This is a Motorbike | Starting engine of motorbike | Stopping motorbike'],
  });

  t.hidden('case-insensitive', {
    operations: [
      ['VehicleFactory'],
      ['orderVehicle', 'motorbike'],
      ['orderVehicle', 'CAR'],
      ['orderVehicle', 'bIkE'],
      ['orderVehicle', 'boat'],
    ],
    expected: [
      null,
      'This is a Motorbike | Starting engine of motorbike | Stopping motorbike',
      'This is a Car | Starting engine of car | Stopping car',
      'This is a Bike | Pedaling bike | Using bike brakes',
      'Unknown type',
    ],
  });
});
