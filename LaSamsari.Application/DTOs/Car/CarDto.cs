namespace LaSamsari.Application.DTOs.Car;

public class CarDto
{
    public int Id { get; set; }
    public string Brand { get; set; } = null!;
    public string Model { get; set; } = null!;
    public int Year { get; set; }
    public int Km { get; set; }
    public decimal Price { get; set; }
    public string Fuel { get; set; } = null!;
    public string Transmission { get; set; } = null!;
    public string Status { get; set; } = "Available";
}
