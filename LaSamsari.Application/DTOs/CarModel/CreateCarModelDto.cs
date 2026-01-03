namespace LaSamsari.Application.DTOs.CarModel;

public class CreateCarModelDto
{
    public string Name { get; set; } = null!;
    public DateOnly LaunchYear { get; set; }
    public int BrandId { get; set; }
}
