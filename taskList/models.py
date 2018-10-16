from django.db import models

# Create your models here.
class Task(models.Model):
  """
  Model representing a grocery store category
  """
  name = models.CharField(max_length=80, help_text="Enter a task description.")
  startDate = models.DateField(max_length=100, help_text="Enter start date")
  endDate = models.DateField(max_length=100, help_text="Enter end date")
  repeat = models.CharField(max_length=80, help_text="Choose if it repeats.")
  times = models.BigIntegerField(max_length=1000, help_text="Choose how many times it repeats")

  def __str__(self):
    """
    String for representing the Model object (in Admin site etc.)
    """
    return self.name