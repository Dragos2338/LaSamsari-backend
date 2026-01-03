using LaSamsari.Application.DTOs.Car;
using LaSamsari.Application.Interfaces;
using LaSamsari.Application.Interfaces.Repositories;
using LaSamsari.Domain.Entities;

namespace LaSamsari.Application.Services;

public class CarService : ICarService
{
    private readonly ICarRepository _carRepository;

    public CarService(ICarRepository carRepository)
    {
        _carRepository = carRepository;
    }

    public async Task<IEnumerable<CarDto>> GetAllAsync()
    {
        var cars = await _carRepository.GetAllAsync();

        return cars.Select(c => new CarDto
        {
            Id = c.Id,
            Brand = c.CarModel.Brand.Name,
            Model = c.CarModel.Name,
            Year = c.Year,
            Km = c.Km,
            Price = c.Price
        });
    }

    public async Task<CarDto> CreateAsync(CreateCarDto dto)
    {
        var car = new Car
        {
            CarModelId = dto.CarModelId,
            Year = dto.Year,
            Km = dto.Km,
            Price = dto.Price,
            Fuel = dto.Fuel,
            Transmission = dto.Transmission
        };

        await _carRepository.AddAsync(car);
        var created = await _carRepository.GetByIdAsync(car.Id)
            ?? throw new Exception("Car not found after creation");

        return new CarDto
        {
            Id = created.Id,
            Brand = created.CarModel.Brand.Name,
            Model = created.CarModel.Name,
            Year = created.Year,
            Km = created.Km,
            Price = created.Price
        };
    }

    public async Task<CarDto> PatchAsync(int id, PatchCarDto dto)
{
    var car = await _carRepository.GetByIdAsync(id)
        ?? throw new Exception("Car not found");

    if (dto.CarModelId.HasValue)
        car.CarModelId = dto.CarModelId.Value;

    if (dto.Year.HasValue)
        car.Year = dto.Year.Value;

    if (dto.Km.HasValue)
        car.Km = dto.Km.Value;

    if (dto.Price.HasValue)
        car.Price = dto.Price.Value;

    await _carRepository.UpdateAsync(car);

    return new CarDto
    {
        Id = car.Id,
        Brand = car.CarModel.Brand.Name,
        Model = car.CarModel.Name,
        Year = car.Year,
        Km = car.Km,
        Price = car.Price
    };
}

    public async Task DeleteAsync(int id)
    {
        await _carRepository.DeleteAsync(id);
    }



}
