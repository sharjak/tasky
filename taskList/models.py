from django.db import models
import psycopg2
import datetime

try:
  conn =psycopg2.connect("dbname='tasky' user='postgres' host='localhost' password='password'")
  cur = conn.cursor()
  print("hAIII")
except:
  print("unable to connect to db")

# Create your models here.
class Task(models.Model):
  """
  Model representing a grocery store category
  """
  name = models.CharField(max_length=80, help_text="Enter a task description.")
  start_date = models.DateField(max_length=100, help_text="Enter start date", null=True, blank=True)
  end_date = models.DateField(max_length=100, help_text="Enter end date", null=True, blank=True)
  repeat = models.CharField(max_length=80, help_text="Choose if it repeats.", null=True, blank=True)
  times = models.BigIntegerField(max_length=1000, help_text="Choose how many times it repeats", null=True, blank=True)

  def __str__(self):
    """
    String for representing the Model object (in Admin site etc.)
    """
    return self.name

  @classmethod
  def create(cls, name, date):
    format_str = '%d %B %Y'
    datetime_obj = datetime.datetime.strptime(date, format_str)
    task = cls(name=name, start_date=datetime_obj, end_date=datetime_obj)
    return task

  @classmethod
  def insert_task(self, name, start_date, end_date, repeat, times):
    """ insert a new vendor into the vendors table """
    sql = """INSERT INTO task(name, start_date, end_date, repeat, times)
             VALUES(%s, %s, %s, %s, %s) RETURNING task_id;"""
    try:
      cur.execute(sql, (name, start_date, end_date, repeat, times))
      task_id = cur.fetchone()[0]
      conn.commit()
      cur.close()
      return task_id
    except (Exception, psycopg2.DatabaseError) as error:
      print(error)
    finally:
      if conn is not None:
        conn.close()
