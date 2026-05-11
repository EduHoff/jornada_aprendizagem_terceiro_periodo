from domain.enums.vehicle_type import VehicleType

class Vehicle:
    def __init__(self, capacity_m3: float, type: VehicleType):
        self._capacity_m3 = capacity_m3
        self._type = type

    @property
    def capacity_m3(self) -> float:
        return self._capacity_m3

    @capacity_m3.setter
    def capacity_m3(self, value: float):
        self._capacity_m3 = value

    @property
    def type(self) -> VehicleType:
        return self._type

    @type.setter
    def type(self, value: VehicleType):
        self._type = value

    def to_dict(self):
        return {
            "capacity_m3": self.capacity_m3,
            "type": self.type.value
        }