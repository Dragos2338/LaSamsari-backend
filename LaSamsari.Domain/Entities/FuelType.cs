namespace LaSamsari.Domain.Entities;

public class FuelType
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    
    public ICollection<Car> Cars { get; set; } = new List<Car>();
}
