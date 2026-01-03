namespace LaSamsari.Application.DTOs.Car;

public class CarDto
{
    public int Id { get; set; }
    public string Brand { get; set; } = null!;
    public string Model { get; set; } = null!;
    public int Year { get; set; }
    public int Km { get; set; }
    public decimal Price { get; set; }
}
