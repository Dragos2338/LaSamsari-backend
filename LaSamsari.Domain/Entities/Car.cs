namespace LaSamsari.Domain.Entities;

public class Car
{
    public int Id { get; set; }

    public int CarModelId { get; set; }
    public CarModel CarModel { get; set; } = null!;

    public int Year { get; set; }
    public int Km { get; set; }
    public decimal Price { get; set; }

    public int FuelTypeId { get; set; }
    public FuelType FuelType { get; set; } = null!;

    public int TransmissionTypeId { get; set; }
    public TransmissionType TransmissionType { get; set; } = null!;

    public ICollection<CarFeature> CarFeatures { get; set; } = new List<CarFeature>();

    public int? UserId { get; set; }
    public UserProfile? User { get; set; }

    public CarStatus Status { get; set; } = CarStatus.Available;
}
