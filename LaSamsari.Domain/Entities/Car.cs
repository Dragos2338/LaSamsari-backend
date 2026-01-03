namespace LaSamsari.Domain.Entities;

public class Car
{
    public int Id { get; set; }

    public int CarModelId { get; set; }
    public CarModel CarModel { get; set; } = null!;

    public int Year { get; set; }
    public int Km { get; set; }
    public decimal Price { get; set; }

    public string Fuel { get; set; } = null!;
    public string Transmission { get; set; } = null!;

    public ICollection<CarFeature> CarFeatures { get; set; } = new List<CarFeature>();
}
