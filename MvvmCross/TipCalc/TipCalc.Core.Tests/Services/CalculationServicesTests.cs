using System;
using NUnit.Framework;
using TipCalc.Core.Services;

namespace TipCalc.Core.Tests
{
	[TestFixture]
	public class CalculationServicesTests
	{
		private ICalculationService _service;

		public CalculationServicesTests()
		{
			
		}

		[TestFixtureSetUp]
		public void Setup()
		{
			_service = new CalculationService();
		}

		[TestCase(100.0,15,15.0)]
		[TestCase(100.0,20,20.0)]
		[TestCase(200.0,15,30.0)]
		[TestCase(0.0,15,0.0)]
		[TestCase(100.0,0,0.0)]
		public void ShouldReturnRightTip(double subTotal, int percentage, double expectedTip)
		{
			// Arrange

			// Act
			var tip = _service.TipAmount(subTotal, percentage);

			// Assert
			Assert.AreEqual(tip, expectedTip);
		}
	}
}

