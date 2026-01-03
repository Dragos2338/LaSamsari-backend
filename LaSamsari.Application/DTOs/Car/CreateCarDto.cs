namespace LaSamsari.Application.DTOs.Car;

public class CreateCarDto
{
    public int CarModelId { get; set; }
    public int Year { get; set; }
    public int Km { get; set; }
    public decimal Price { get; set; }
    public string Fuel { get; set; } = null!;
    public string Transmission { get; set; } = null!;
}
