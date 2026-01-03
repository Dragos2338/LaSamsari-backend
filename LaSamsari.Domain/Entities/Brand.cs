namespace LaSamsari.Domain.Entities;

public class Brand
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;

    // Brand.cs
    public ICollection<CarModel> CarModels { get; set; } = new List<CarModel>();

}
