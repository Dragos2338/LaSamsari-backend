namespace LaSamsari.Domain.Entities;

public class Feature
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;

    public ICollection<CarFeature> CarFeatures { get; set; } = new List<CarFeature>();
}
