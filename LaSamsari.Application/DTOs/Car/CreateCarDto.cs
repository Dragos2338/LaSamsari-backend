namespace LaSamsari.Application.DTOs.Car;

public class CreateCarDto
{
    public int CarModelId { get; set; }
    public int Year { get; set; }
    public int Km { get; set; }
    public decimal Price { get; set; }
    public int FuelTypeId { get; set; }
    public int TransmissionTypeId { get; set; }
    public int Status { get; set; } = 0; // 0=Available, 1=Pending, 2=Sold
}
