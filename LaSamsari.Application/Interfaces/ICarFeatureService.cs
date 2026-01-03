using LaSamsari.Application.DTOs.CarFeature;

public interface ICarFeatureService
{
    Task<List<CarFeatureDto>> GetByCarIdAsync(int carId);
    Task AddAsync(AddCarFeatureDto dto);
    Task RemoveAsync(AddCarFeatureDto dto);
}
