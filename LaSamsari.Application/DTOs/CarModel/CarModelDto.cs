namespace LaSamsari.Application.DTOs.CarModel;

public class CarModelDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public DateOnly LaunchYear { get; set; }
    public int BrandId { get; set; }
}
