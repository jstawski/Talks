using System;
using NUnit.Framework;
using TipCalc.Core.ViewModels;
using Moq;
using TipCalc.Core.Services;
using TipCalc.Core.Test.Mocks;
using Cirrious.CrossCore;
using Cirrious.MvvmCross.Views;
using Cirrious.CrossCore.Core;
using Cirrious.MvvmCross.Platform;
using Cirrious.MvvmCross.Test.Core;
using Acr.MvvmCross.Plugins.Settings;

namespace TipCalc.Core.Tests
{
	[TestFixture]
	public class TipViewModelTests : MvxIoCSupportingTest
	{
		private TipViewModel _viewModel;
		private Mock<ICalculationService> _calculationService;
		private Mock<ISettingsService> _settingsService;
		protected MockMvxViewDispatcher MockDispatcher { get; private set; }

		protected override void AdditionalSetup()
		{
			MockDispatcher = new MockMvxViewDispatcher();
			Ioc.RegisterSingleton<IMvxViewDispatcher>(MockDispatcher);
			Ioc.RegisterSingleton<IMvxMainThreadDispatcher>(MockDispatcher);
			// for navigation parsing
			Ioc.RegisterSingleton<IMvxStringToTypeParser>(new MvxStringToTypeParser());
		}

		[TestFixtureSetUp]
		public void FixtureSetup()
		{
			//needed by MvxIoCSupportTest
			base.Setup();
			_calculationService = new Mock<ICalculationService>();
			_settingsService = new Mock<ISettingsService>();
			_viewModel = new TipViewModel(_calculationService.Object, _settingsService.Object);
		}

		[Test]
		public void ShouldDefaultValuesWhenItStarts()
		{
			// Arrange
			_calculationService.Setup(x => x.TipAmount(It.IsAny<double>(), 
				It.IsAny<int>())).Returns(10.0);
			_settingsService.Setup(x => x.Get("SubTotal", "100.00")).Returns("100.00");
			_settingsService.Setup(x => x.Get("Generosity", "10")).Returns("10");

			// Act
			_viewModel.Start();

			// Assert
			Assert.AreEqual(100.0, _viewModel.SubTotal);
			Assert.AreEqual(10, _viewModel.Generosity);
			Assert.AreEqual(10.0, _viewModel.Tip);
			_calculationService.Verify(x => x.TipAmount(_viewModel.SubTotal, _viewModel.Generosity), 
				Times.Once);
			_settingsService.Verify(x => x.Get("SubTotal", "100.00"), Times.Once);
			_settingsService.Verify(x => x.Get("Generosity", "10"), Times.Once);

		}

		[Test]
		public void ShouldRecalculateAfterSettingSubTotal()
		{
			// Arrange
			_viewModel.Start();

			// Act
			_viewModel.SubTotal = 10.0;

			// Assert
			_calculationService.Verify(x => x.TipAmount(10.0, _viewModel.Generosity), Times.Once);
		}

		[Test]
		public void ShouldRecalculateAfterSettingGenerosity()
		{
			// Arrange
			_viewModel.Start();

			// Act
			_viewModel.Generosity = 15;

			// Assert
			_calculationService.Verify(x => x.TipAmount(_viewModel.SubTotal, 15), Times.Once);
		}

		[Test]
		public void ShouldGoToSettingsAfterClickingSettings()
		{
			// Arrange

			// Act
			_viewModel.Settings.Execute(null);

			// Assert
			Assert.AreEqual(1, MockDispatcher.NavigateRequests.Count);
			Assert.AreEqual(typeof(SettingsViewModel), MockDispatcher.NavigateRequests[0].ViewModelType);
		}
	}
}

