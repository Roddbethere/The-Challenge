// FILE: ShapeSystem.Application/ShapeService.cs
// LAYER: Service — coordinates Domain + Infrastructure, contains NEITHER

using System;
using ShapeSystem.Domain;
using ShapeSystem.Infrastructure;

namespace ShapeSystem.Application
{
    public class ShapeService
    {
        // We hold the interface, not a specific logger class.
        // Whoever creates ShapeService decides which logger to inject.
        private readonly IShapeLogger _logger;

        public ShapeService(IShapeLogger logger)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public double Process(Shape shape)
        {
            if (shape == null) throw new ArgumentNullException(nameof(shape));

            double area = shape.CalculateArea();    // Domain does the math
            string entry = $"[{DateTime.Now:yyyy-MM-dd HH:mm:ss}] " +
                           $"{shape.ShapeType}: area = {area:F4}";
            _logger.Log(entry);                      // Infrastructure does the output

            return area;
        }
    }
}