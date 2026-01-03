namespace LaSamsari.Domain.Entities;

public class CarFeature
{
    public int CarId { get; set; }
    public Car Car { get; set; } = null!;

    public int FeatureId { get; set; }
    public Feature Feature { get; set; } = null!;
}
