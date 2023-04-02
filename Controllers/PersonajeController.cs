using BackendAternaNet.Models;
using BackendAternaNet.Database;
using Microsoft.AspNetCore.Mvc;


namespace BackendAternaNet.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PersonajeController : ControllerBase
{
    private readonly AlternaDbContext dbContext;

    public PersonajeController(AlternaDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    [HttpGet]
    public ActionResult<IEnumerable<PersonajeModel>> Get()
    {
        IEnumerable<PersonajeModel> result = dbContext.Personaje.ToList();
        return Ok(result);
    }

    [HttpGet("{id:int}")]
    public ActionResult<PersonajeModel> Get(int id)
    {
        try
        {
            PersonajeModel result = dbContext
                                    .Personaje
                                    .Where((p) => p.Id == id)
                                    .FirstOrDefault();

            if (result == null)
                return NotFound("Elemento no encontrado");

            return Ok(result);
        }
        catch (System.Exception)
        {
            return Problem("Ha ocurrido un error inesperado");
        }
    }

    [HttpGet("{alte}")]
    public ActionResult<PersonajeModel> Get(string alte)
    {
        try
        {
            PersonajeModel result = dbContext
                                    .Personaje
                                    .Where((p) => p.Alte == alte)
                                    .FirstOrDefault();

            if (result == null)
                return NotFound("Elemento no encontrado");

            return Ok(result);
        }
        catch (System.Exception)
        {
            return Problem("Ha ocurrido un error inesperado");
        }
    }

    [HttpPost]
    public async Task<ActionResult<PersonajeModel>> Post([FromBody] PersonajeModel personaje)
    {
        await dbContext.Personaje.AddAsync(personaje);
        await dbContext.SaveChangesAsync();

        return Created("", personaje);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<PersonajeModel>> Put(
        [FromRoute] int id,
        [FromBody] PersonajeModel personaje)
    {
        PersonajeModel personajeModel = dbContext.Personaje
            .Where((p) => p.Id == id)
            .FirstOrDefault();

        if(personajeModel == null)
                return NotFound();

        personajeModel.Alte = personaje.Alte;
        personajeModel.Nombre = personaje.Nombre;
        personajeModel.Rol = personaje.Rol;

        dbContext.Personaje.Update(personajeModel);
        await dbContext.SaveChangesAsync();

        return Ok(personaje);
    }
    [HttpDelete("Delete/:{id}")]

    public async Task<int> Delete([FromRoute] int id)
    {
        PersonajeModel personajeModel = dbContext.Personaje
           .Where((p) => p.Id == id)
           .FirstOrDefault();

        if (personajeModel == null)
        {
            return StatusCodes.Status404NotFound;
        }

        dbContext.Remove(personajeModel);
        await dbContext.SaveChangesAsync();
        return StatusCodes.Status102Processing;
    }
    
}
